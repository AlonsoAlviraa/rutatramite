import { describe,expect,it } from "vitest";
import { DNI_NICHOS_GUIDES } from "@/lib/tramites/nichos-dni";
import { IDENTIDAD_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-identidad";

describe('identity guidance must not invent an administrative route',()=>{
  it('distinguishes a legitimate prepaid document fee from paid appointment intermediaries',()=>{
    const guide=DNI_NICHOS_GUIDES.find(g=>g.path==='/dni/paginas-clon-cita')!;
    const text=JSON.stringify(guide);
    expect(text).toContain('tasa del documento puede pagarse anticipadamente');
    expect(text).not.toMatch(/Pago previo = clon|solo pagas la tasa del documento al recogerlo|señal inequívoca/);
    expect(guide.sources?.some(s=>s.href.includes('interior.gob.es')&&s.href.includes('/tasas/dni/'))).toBe(true);
  });
  it('does not equate an expired identity card with automatic banking or police sanctions',()=>{
    const bank=JSON.stringify(DNI_NICHOS_GUIDES.find(g=>g.path==='/dni/caducado-banco'));
    expect(bank).toContain('desproporcionado');expect(bank).toContain('clientebancario.bde.es');
    expect(bank).not.toContain('el bloqueo es legal');
    const police=JSON.stringify(DNI_NICHOS_GUIDES.find(g=>g.path==='/dni/caducado-multa'));
    expect(police).toContain('tercera y posteriores pérdidas o extravíos en un año');
    expect(police).not.toMatch(/equivale a ir sin documento|cierra el episodio sin multa/);
  });
  it('requires FNMT identity evidence instead of an invented postal activation',()=>{
    const guide=IDENTIDAD_NICHOS2_GUIDES.find(g=>g.path==='/extranjeria/certificado-digital-nie')!;
    const text=JSON.stringify(guide);
    expect(text).toContain('acreditación presencial');expect(text).toContain('pasaporte en vigor');
    expect(text).not.toMatch(/validar.*o por carta|O por carta:|código de activación te llegue al domicilio/);
    expect(guide.sources?.some(s=>s.href.endsWith('/obtener-certificado-software/acreditar-identidad'))).toBe(true);
  });
});
