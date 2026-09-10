export function whatsappUrl(config, productName = '') {
  let number = config.whatsapp.replace(/\D/g, '');
  if (config.whatsappLink) {
    const link = new URL(config.whatsappLink);
    if (!['https:', 'http:'].includes(link.protocol)) throw new Error('Link WhatsApp inválido');
    if (link.hostname === 'wa.me') {
      const match = link.pathname.match(/^\/(?:c\/)?(\d{10,15})\/?$/);
      if (!match) throw new Error('Use um link wa.me com número ou catálogo /c/NUMERO');
      number = match[1];
    }
    else if (['api.whatsapp.com','web.whatsapp.com','www.whatsapp.com','whatsapp.com'].includes(link.hostname)) number = link.searchParams.get('phone')?.replace(/\D/g, '') || number;
    else throw new Error('Use um link oficial wa.me ou api.whatsapp.com com número');
  }
  if (!number) return '';
  if (!/^\d{10,15}$/.test(number)) throw new Error('WhatsApp: informe DDI, DDD e número');
  const message = productName
    ? `Olá! Vi no site da ${config.siteName} o produto ${productName} e gostaria de saber mais sobre valores e personalização.`
    : config.mensagemGeral;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function instagramUrl(config) {
  if (!config.instagramLink && !config.instagram) return '';
  const value = config.instagramLink || `https://www.instagram.com/${config.instagram.replace(/^@/,'')}/`;
  const url = new URL(value);
  if (url.protocol !== 'https:' || !['instagram.com','www.instagram.com'].includes(url.hostname)) throw new Error('Informe uma URL HTTPS oficial do Instagram');
  return url.href;
}
