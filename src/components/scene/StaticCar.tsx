/** Carro desenhado em SVG: aparece enquanto a cena 3D não carrega e para quem prefere menos movimento. */
export function StaticCar() {
  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      role="img"
      aria-label="Carrinho roxo de brinquedo"
    >
      <ellipse
        cx="240"
        cy="250"
        rx="190"
        ry="26"
        fill="var(--panel2)"
        stroke="var(--line)"
        strokeWidth="4"
      />
      <path
        d="M110 205h260v-48l-44-44H190l-48 44h-32z"
        fill="var(--violet)"
        stroke="var(--line)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M196 124h112l32 33H162z"
        fill="var(--ink)"
        stroke="var(--line)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <rect
        x="230"
        y="168"
        width="70"
        height="14"
        rx="7"
        fill="var(--accent)"
        stroke="var(--line)"
        strokeWidth="4"
      />
      <circle cx="170" cy="212" r="28" fill="var(--line)" />
      <circle cx="320" cy="212" r="28" fill="var(--line)" />
      <circle cx="170" cy="212" r="10" fill="var(--accent)" />
      <circle cx="320" cy="212" r="10" fill="var(--accent)" />
    </svg>
  )
}
