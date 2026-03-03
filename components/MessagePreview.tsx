import React, { useState, useEffect } from 'react';
import { Info, ClipboardCheck, Edit3 } from 'lucide-react';
import { ClientData, SellerType } from '../types';

const SELLER_CONFIG: Record<SellerType, { image: string; link: string; footer: string }> = {
  OF: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/acceso-clientes---catalogo-infema-r8CaKRCd6BfhZdMn.gif",
    link: "https://catalogo.infema.cl/clientes",
    footer: "Saludos,\nLorena Barros"
  },
  MB: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/mb",
    footer: "Saludos,\nLorena Barros"
  },
  FU: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/fu",
    footer: "Saludos,\nLorena Barros"
  },
  HC: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/hc",
    footer: "Saludos,\nLorena Barros"
  },
  MP: {
    image: "https://assets.zyrosite.com/AE04NxxDXof684vj/catalogo-rv-clientes-infema-16upimTIABgknqKM.gif",
    link: "https://catalogo.infema.cl/mp",
    footer: "Saludos,\nLorena Barros"
  },
  "": { image: "", link: "", footer: "" }
};

const getDynamicSignature = (cid: string) => {
  return `<div dir=ltr><table style=direction:ltr;border-collapse:collapse;><tr><td style=font-size:0;height:12px;line-height:0;></td></tr><tr><td><table cellpadding=0  cellspacing=0  border=0  style=width:100%;  width=100%><tr><td><table cellpadding=0  cellspacing=0  style=border-collapse:collapse;line-height:1.15;><tr><td style="height:1px;width:97px;vertical-align:middle;padding:.01px 1px;"><table cellpadding=0  cellspacing=0  style=border-collapse:collapse;><tr><td style="vertical-align:middle;padding:.01px 1px 14px 0.01px;width:71px;text-align:center;"><img border=0  src=https://gifo.srv.wisestamp.com/im/sh/dS9RTThtUkJrb29ZZS84ZDdjNzkxMi04NDE4LTQ4MzAtODc5Zi1iNzExNmFjZmNlMmZfXzQwMHg0MDBfXy5wbmcjbG9nbw==/rounded.png  height=71  width=71  alt=photo  style=width:71px;vertical-align:middle;border-radius:4px;height:71px;border:0;display:block;></td></tr><tr><td style=vertical-align:middle;padding:.01px;width:97px;text-align:center;><a href=https://catalogo.infema.cl/qr?cid=${cid}  style=display:block;font-size:.1px  target=_blank  rel="nofollow noreferrer"><img border=0  src=https://d36urhup7zbd7q.cloudfront.net/u/QM8mRBkooYe/3ed17dc1-1d70-481c-8784-7c5b23d80d11__400x566__.png  height=137  width=97  alt=photo  style=width:97px;vertical-align:middle;border-radius:0;height:137px;border:0;display:block;></a></td></tr></table></td><td valign=top  style="padding:.01px 0.01px 0.01px 14px;vertical-align:top;"><table cellpadding=0  cellspacing=0  style=border-collapse:collapse;><tr><td style="line-height:1.2;padding:.01px 0.01px 14px 0.01px;border-bottom:solid 1px #5A0606;" nowrap><p style=margin:.1px;line-height:120%;font-size:21px;><span style=font-family:Arial;font-size:21px;font-weight:bold;color:#5A0606;letter-spacing:0;white-space:nowrap;>Infema ltda.</span><br><span style=font-family:Arial;font-size:16px;font-weight:bold;color:#646464;white-space:nowrap;>Regalos - Deco - Hogar</span></p></td></tr><tr><td nowrap width=144  height=0  style=height:0;padding-top:14px;white-space:nowrap;width:144px;font-family:Arial;><p style=margin:1px;line-height:99%;font-size:14px;><span style=white-space:nowrap;><img src=https://gifo.srv.wisestamp.com/s/rfem1/5A0606/28/trans.png  style=line-height:120%;width:15px;  width=15  alt=icon>&nbsp;<a href=mailto:infema@infema.cl  target=_blank  style=font-family:Arial;text-decoration:unset;  rel="nofollow noreferrer"><span style=line-height:120%;font-family:Arial;font-size:14px;color-scheme:only;color:#5A0606;white-space:nowrap;>infema@infema.cl</span></a></span></p></td></tr><tr><td nowrap width=132  height=0  style=height:0;padding-top:9px;white-space:nowrap;width:132px;font-family:Arial;><p style=margin:1px;line-height:99%;font-size:14px;><span style=white-space:nowrap;><img src=https://gifo.srv.wisestamp.com/s/rfm2/5A0606/28/trans.png  style=line-height:120%;width:15px;  width=15  alt=icon>&nbsp;<a href=tel:+56989006937  target=_blank  style=font-family:Arial;text-decoration:unset;  rel="nofollow noreferrer"><span style=line-height:120%;font-family:Arial;font-size:14px;color-scheme:only;color:#5A0606;white-space:nowrap;>+569 8900 6937</span></a></span></p></td></tr><tr><td nowrap width=90  height=0  style=height:0;padding-top:9px;white-space:nowrap;width:90px;font-family:Arial;><p style=margin:1px;line-height:99%;font-size:14px;><span style=white-space:nowrap;><img src=https://gifo.srv.wisestamp.com/s/rfw1/5A0606/28/trans.png  style=line-height:120%;width:15px;  width=15  alt=icon>&nbsp;<a href=https://infema.cl  target=_blank  style=font-family:Arial;text-decoration:unset;  rel="nofollow noreferrer"><span style=line-height:120%;font-family:Arial;font-size:14px;color-scheme:only;color:#5A0606;white-space:nowrap;>infema.cl</span></a></span></p></td></tr><tr><td height=0  style="height:0;padding:14px 0.01px 0.01px 0.01px;"><table border=0  cellpadding=0  cellspacing=0><tr><td align=left  style=padding-right:18px;text-align:center;padding-top:0;><p style=margin:1px;><a href=https://wa.me/56989006937  target=_blank  rel="nofollow noreferrer"><img width=28  height=28  src=https://gifo.srv.wisestamp.com/s/wa/25d366/56/4/background.png  style=float:left;border:none;  border=0  alt=wa  /></a></p></td><td align=left  style=padding-right:18px;text-align:center;padding-top:0;><p style=margin:1px;><a href=https://facebook.com/infemachile  target=_blank  rel="nofollow noreferrer"><img width=28  height=28  src=https://gifo.srv.wisestamp.com/s/fb/3b5998/56/4/background.png  style=float:left;border:none;  border=0  alt=facebook  /></a></p></td><td align=left  style=padding-right:18px;text-align:center;padding-top:0;><p style=margin:1px;><a href=https://instagram.com/infemachile  target=_blank  rel="nofollow noreferrer"><img width=28  height=28  src=https://gifo.srv.wisestamp.com/s/inst/E4405F/56/4/background.png  style=float:left;border:none;  border=0  alt=instagram  /></a></p></td></tr></table></td></tr></table></td></tr></table></td></tr><tr><td height=0  style=height:0;line-height:1%;padding-top:16px;font-size:1px;></td></tr><tr><td><table cellpadding=0  cellspacing=0  style=border-collapse:collapse;line-height:normal;width:100%;  width=100%><tr><td height=0  style=height:0;text-align:left;><p style=margin:1px;><a href=https://clientes.infema.cl/catalogo?cid=${cid}  target=_blank  rel="nofollow noreferrer"><img src=https://d36urhup7zbd7q.cloudfront.net/u/QM8mRBkooYe/baf5fe34-c0f6-4164-8117-4680d89ae03d__600x200__.gif  style=width:299px;height:99px;  width=299  height=99  alt="App Banner Image"></a></p></td></tr></table></td></tr><tr><td height=0  style=height:0;line-height:1%;padding-top:16px;font-size:1px;></td></tr></table></td></tr><tr><td style="font-family:'ws-id zpW3832JlvEq';font-size:.01px;line-height:0;">&nbsp;</td></tr></table></div>`;
};

const getTextSignature = (cid: string) => {
  return `Saludos,
Lorena Barros
─────────────
📧 infema@infema.cl
📞 9 8900 6937
🌐 https://www.infema.cl

📇 Guardar Contacto:
https://catalogo.infema.cl/qr?cid=${cid}`;
};

interface MessagePreviewProps {
  client: ClientData | null;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({ client }) => {
  const [editableMessage, setEditableMessage] = useState('');
  const [justCopied, setJustCopied] = useState(false);

  const generateCID = (client: ClientData) => {
    if (client.sendMethod === 'whatsapp' && client.phone) {
      const cleanPhone = client.phone.replace('+569', '');
      return cleanPhone.slice(0, -1);
    } else {
      const email = client.email || '';
      const parts = email.split('@');
      if (parts.length === 2) {
        const pre = parts[0].substring(0, 3);
        const post = parts[1].substring(0, 3);
        return `${pre}.${post}`.toLowerCase();
      }
      return "user.inf";
    }
  };

  useEffect(() => {
    if (client) {
      const config = SELLER_CONFIG[client.seller];
      const cid = generateCID(client);
      const genderPrefix = client.gender === 'hombre' ? 'D. ' : client.gender === 'mujer' ? 'Sra. ' : '';
      let salutation = client.name 
        ? `👋 Hola ${genderPrefix}${client.name},` 
        : (client.company ? `${client.company}.\nEstimado cliente,` : `Estimado cliente,`);

      const connector = config.link.includes('?') ? '&' : '?';
      const fullLink = `${config.link}${connector}cid=${cid}`;
      
      let mainText = client.deliveryFormat === 'pdf' 
        ? "ADJUNTO PDFs." 
        : "📖 Le comparto el enlace directo al catálogo en línea (aquí lo estaremos actualizando):";
      
      let bodyText = "";
      if (client.sendMethod === 'email') {
        if (client.deliveryFormat === 'pdf') {
          const sigPlaceholder = client.seller === 'OF' ? "\n\n[FIRMA_WIS_PDF]" : "";
          bodyText = `${salutation}\n\n${mainText}\n\n${config.footer}${sigPlaceholder}`;
        } else {
          bodyText = client.seller === 'OF'
            ? `${salutation}\n\n${mainText}\n\n📌 Para entrar la primera vez por favor use el nombre de Usuario y Contraseña que aparecen en la foto.\n\n[ELEMENTO_ENLACE]`
            : `${salutation}\n\n${mainText}\n\n[ELEMENTO_ENLACE]`;
        }
      } else {
        if (client.deliveryFormat === 'pdf') {
          const signaturePart = (client.seller === 'OF') ? `\n\n${getTextSignature(cid)}` : `\n${config.footer}`;
          bodyText = `${salutation}\n\n${mainText}${signaturePart}`;
        } else {
          bodyText = client.seller === 'OF'
            ? `${salutation}\n\n${mainText}\n─────────────\n🔗 ${fullLink}\n─────────────\n📌 Para entrar la primera vez por favor use el nombre de Usuario y Contraseña que aparecen en la foto.\n\n${config.footer}`
            : `${salutation}\n\n${mainText}\n─────────────\n🔗 ${fullLink}\n─────────────\n${config.footer}`;
        }
      }
      setEditableMessage(bodyText);
    }
  }, [client]);

  const handleCopyAndShare = async () => {
    if (!client || !editableMessage) return;
    const config = SELLER_CONFIG[client.seller];
    const cid = generateCID(client);
    const connector = config.link.includes('?') ? '&' : '?';
    const clientLink = `${config.link}${connector}cid=${cid}`;
    try {
      const currentText = editableMessage;
      const plainText = currentText.replace('[ELEMENTO_ENLACE]', '').replace('[FIRMA_WIS_PDF]', '');
      let bodyHtml = currentText.replace(/\n/g, '<br>');
      if (client.sendMethod === 'email') {
        const footerHtml = config.footer.replace(/\n/g, '<br>');
        const dynamicSignature = getDynamicSignature(cid);
        if (client.deliveryFormat === 'link') {
          const visualBlock = `<div style="margin: 25px 0;"><a href="${clientLink}" target="_blank" style="text-decoration: none; border: 0;"><img src="${config.image}" width="550" alt="Ver Catálogo" style="width: 550px; max-width: 100%; border: 0; display: block; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);"></a></div>`;
          const emailSection = `${visualBlock}<br>${footerHtml}`;
          bodyHtml = bodyHtml.replace('[ELEMENTO_ENLACE]', emailSection);
        } else {
          bodyHtml = bodyHtml.replace('[FIRMA_WIS_PDF]', client.seller === 'OF' ? dynamicSignature : "");
        }
      }
      const finalHtml = `<html><head><meta charset="UTF-8"></head><body><div style="font-family: 'Segoe UI', Arial, sans-serif; color: #2d3748; line-height: 1.6; font-size: 12pt;">${bodyHtml}</div></body></html>`;
      const data = [new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([finalHtml], { type: 'text/html' })
      })];
      await navigator.clipboard.write(data);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
      if (client.sendMethod === 'whatsapp' && client.phone) {
        window.open(`https://wa.me/${client.phone.replace('+', '')}`, '_blank');
      } else if (client.sendMethod === 'email') {
        const subjectLine = client.deliveryFormat === 'pdf' ? "Adjunto PDFs." : "Adjunto Catálogo Digital";
        window.location.href = `mailto:${client.email}?subject=${encodeURIComponent(subjectLine)}`;
      }
    } catch (err) { console.error('Error al copiar:', err); }
  };

  if (!client) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 h-64 flex flex-col items-center justify-center p-6 text-center text-slate-400">
        <Info className="w-8 h-8 mb-2 opacity-20" />
        <p className="text-sm">Selecciona un cliente para ver la previa</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[500px]">
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center">
        <Edit3 className="w-4 h-4 text-amber-600 mr-2" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">Personalización del Mensaje</span>
      </div>
      <div className="flex-grow p-4 flex flex-col overflow-hidden bg-slate-50">
        <textarea
          value={editableMessage}
          onChange={(e) => setEditableMessage(e.target.value)}
          className={`w-full h-full p-4 rounded-lg text-slate-900 text-sm lg:text-base leading-relaxed resize-none focus:ring-2 focus:ring-amber-500 outline-none border transition-colors ${
            client.sendMethod === 'whatsapp' ? 'bg-[#e5ddd5] border-[#d1d7db]' : 'bg-white border-slate-200 shadow-inner'
          }`}
          placeholder="Escribe tu mensaje aquí..."
        />
      </div>
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <button
          onClick={handleCopyAndShare}
          className={`w-full flex items-center justify-center gap-2 py-3 text-white rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 ${
            justCopied ? 'bg-green-600' : (client.sendMethod === 'whatsapp' ? 'bg-[#25D366]' : 'bg-indigo-600')
          }`}
        >
          <ClipboardCheck className="w-5 h-5" />
          {justCopied ? '¡Copiado!' : (client.sendMethod === 'email' ? 'Copiar y abrir Email' : 'Copiar y abrir WhatsApp')}
        </button>
      </div>
    </div>
  );
};
