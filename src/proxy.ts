import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en-gb', 'pt-br'];
const defaultLocale = 'en-gb';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Verificar se a URL já possui localidade válida
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Definir/atualizar o cookie com a localidade atual da URL para persistência
    const pathLocale = pathname.split('/')[1];
    const response = NextResponse.next();
    response.cookies.set('locale', pathLocale, { maxAge: 365 * 24 * 60 * 60, path: '/' });
    return response;
  }

  // 2. Detecção automática na ausência da localidade na URL
  // Prioridade 1: Cookie 'locale'
  const cookieLocale = request.cookies.get('locale')?.value;
  let detectedLocale = cookieLocale;

  if (!detectedLocale || !locales.includes(detectedLocale)) {
    // Prioridade 2: Accept-Language Header do navegador
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const parsedLocales = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0].trim().toLowerCase());
      
      const foundLocale = parsedLocales.find((lang) => {
        if (locales.includes(lang)) return true;
        const prefix = lang.split('-')[0];
        return locales.some((l) => l.startsWith(prefix));
      });

      if (foundLocale) {
        if (locales.includes(foundLocale)) {
          detectedLocale = foundLocale;
        } else {
          detectedLocale = locales.find((l) => l.startsWith(foundLocale.split('-')[0])) || undefined;
        }
      }
    }
  }

  // Fallback final
  if (!detectedLocale || !locales.includes(detectedLocale)) {
    detectedLocale = defaultLocale;
  }

  // 3. Redirecionamento 307 limpo preservando queries e subpaths
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;
  
  const response = NextResponse.redirect(url, 307);
  response.cookies.set('locale', detectedLocale, { maxAge: 365 * 24 * 60 * 60, path: '/' });
  return response;
}

export const config = {
  matcher: [
    // Ignorar chamadas de API, arquivos estáticos, favicon, imagens, etc.
    '/((?!api|_next/static|_next/image|assets|favicon.ico|treadmill_woman_hero.png|.*\\..*).*)',
  ],
};
