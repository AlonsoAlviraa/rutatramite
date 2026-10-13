# Dominio canónico: rutatramite.es

**Estado 2026-09-03:** el sitio **está en producción en `https://rutatramite.com`** (Cloudflare + VPS OVH, aislado de VisionSetil). Runbook: [`VPS_DESPLIEGUE.md`](VPS_DESPLIEGUE.md).

El plan original era el `.es` como canónico y el `.com` solo como redirect. Hoy el canónico vivo es el `.com`. Este archivo se deja como nota de marca `.es`; no lo uses para desplegar.

El site ya está marcado para este host. Compra **rutatramite.es** (y, si está barato, **rutatramite.com** solo para redirigir al .es).

## Comprar

1. Registrar `rutatramite.es` en un registrador .es (Nic.es / proveedor acreditado). Titular persona o empresa en la UE.
2. Opcional: `rutatramite.com` → redirección 301 a `https://rutatramite.es`.
3. No uses subdominios tipo `sede.rutatramite.es` ni URLs que imiten `sede.gob.es`.

## DNS (cuando despliegues)

Apunta el ápex y `www` al hosting (Vercel o Cloudflare Pages):

- `rutatramite.es` → A / ALIAS del proveedor
- `www.rutatramite.es` → CNAME al proveedor (el site ya redirige www → ápex 301)

HTTPS en el ápex. Sin www en canónicos.

## Tras el DNS

1. `NEXT_PUBLIC_SITE_URL=https://rutatramite.es` (es el default del código).
2. Search Console: propiedad de dominio `rutatramite.es`, enviar `https://rutatramite.es/sitemap.xml`.
3. No hace falta cambiar titles, hreflang ni JSON-LD: ya usan ese origen.

## Qué no tocar

- Paleta / copy que imite sede electrónica.
- Vender citas o cobrar el alta.
- Inventar `sede_url`, teléfonos o `cita_url`.
