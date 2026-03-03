import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Send, Info } from 'lucide-react';
import { ClientManager } from './components/ClientManager';
import { MessagePreview } from './components/MessagePreview';
import { ClientData, SellerType, SendMethod, GenderType, DeliveryFormat } from './types';

function App() {
  const [currentClient, setCurrentClient] = useState<ClientData | null>(null);
  const [savedClients, setSavedClients] = useState<ClientData[]>([]);
  const [urlPrefill, setUrlPrefill] = useState<Partial<ClientData> | null>(null);

  // Captura de datos desde Excel (URL Params)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasAnyParam = params.has('empresa') || params.has('nombre') || params.has('email') || params.has('tel');
    
    if (hasAnyParam) {
      const prefill: Partial<ClientData> = {
        name: params.get('nombre') || '',
        lastName: params.get('apellido') || '',
        company: params.get('empresa') || '',
        gender: (params.get('genero')?.toLowerCase() as GenderType) || '',
        phone: params.get('tel')?.replace(/\s/g, '+') || '',
        email: params.get('email') || '',
        seller: (params.get('vendedor')?.toUpperCase() as SellerType) || '',
        sendMethod: (params.get('metodo')?.toLowerCase() as SendMethod) || '',
        deliveryFormat: (params.get('formato') as DeliveryFormat) || 'link',
      };
      
      setUrlPrefill(prefill);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const storedClients = localStorage.getItem('infema_v2_clients_vendedores');
    if (storedClients) {
      try { 
        setSavedClients(JSON.parse(storedClients)); 
      } catch (e) { 
        console.error("Error cargando historial:", e); 
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('infema_v2_clients_vendedores', JSON.stringify(savedClients));
  }, [savedClients]);

  const handleAddClient = useCallback((client: ClientData) => {
    setSavedClients(prev => {
      const existsIdx = prev.findIndex(c => 
        c.id === client.id || 
        (c.seller === client.seller && c.company.toLowerCase().trim() === client.company.toLowerCase().trim())
      );

      const filteredList = prev.filter((_, idx) => idx !== existsIdx);
      const finalClient: ClientData = {
        ...client,
        id: existsIdx !== -1 ? prev[existsIdx].id : (client.id || Date.now().toString()),
        lastSentMethod: client.sendMethod
      };

      const updatedList = [finalClient, ...filteredList].slice(0, 100);
      setCurrentClient(finalClient);
      return updatedList;
    });
  }, []);

  const handleDeleteClient = useCallback((idToDelete: string) => {
    setSavedClients(prev => prev.filter(c => c.id !== idToDelete));
    setCurrentClient(current => current?.id === idToDelete ? null : current);
  }, []);

  const handleExportClients = useCallback(() => {
    if (savedClients.length === 0) return;
    const headers = ['Nombre Contacto', 'Empresa', 'Género', 'Vendedor', 'Medio', 'Teléfono', 'Email', 'Último Envío'];
    const rows = savedClients.map(client => [
      client.name || '',
      client.company,
      client.gender,
      client.seller,
      client.sendMethod,
      client.phone || '',
      client.email || '',
      client.lastSentMethod || 'Pendiente'
    ]);
    const csvContent = "\uFEFF" + [headers.join(';'), ...rows.map(row => row.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `clientes_infema_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  }, [savedClients]);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <header className="bg-[#1e293b] text-white shadow-md sticky top-0 z-50 safe-top flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-black tracking-tight text-white uppercase italic">INFEMA</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 uppercase tracking-widest">
              V2.7
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 space-y-6">
        
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-800 px-6 py-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-400" />
            <h2 className="text-white font-bold text-sm tracking-wide uppercase">Guía de Envío Rápido</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Send className="w-5 h-5 text-[#25D366]" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-tight">Vía WhatsApp</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-50 text-[#25D366] rounded-full flex items-center justify-center text-xs font-black">1</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Después de completar los campos (vienen de Excel) y generar el mensaje (editable), haz clic en <strong>"Copiar y abrir Whatsapp"</strong>.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-50 text-[#25D366] rounded-full flex items-center justify-center text-xs font-black">2</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Si el medio de envío es <strong>ENLACE</strong>, primero adjunta la imagen y luego haz clic derecho para pegar el mensaje. Si es (son) <strong>PDF (s)</strong>, pega y envía primero el mensaje y luego el (o los) PDF (s) en otro mensaje a continuación.
                  </p>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Mail className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-tight">Vía Email</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-black">1</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Después de completar los campos (vienen de Excel) y generar el mensaje (editable), haz clic en <strong>"Copiar y abrir Email"</strong>.
                  </p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-black">2</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Si el medio de envío es <strong>ENLACE</strong>, haz clic derecho en el cuerpo del mensaje y <strong>pega el texto generado</strong> (se insertará automáticamente el GIF con enlace al catálogo correspondiente a la oficina o a cada vendedor). Si es(son) <strong>PDF(s)</strong>, pega el texto generado y luego adjunta los PDF.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <ClientManager 
            onClientSelect={handleAddClient} 
            savedClients={savedClients}
            onDeleteClient={handleDeleteClient}
            currentClientId={currentClient?.id}
            onExportClients={handleExportClients}
            prefillData={urlPrefill}
          />
          <MessagePreview client={currentClient} />
        </div>
      </main>
      
      <footer className="mt-auto py-4 text-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">INFEMA LTDA - Equipo de Ventas Interno</p>
      </footer>
    </div>
  );
}

export default App;