import { createFileRoute } from "@tanstack/react-router";
import { BOM, CLUB } from "@/data/club";

export const Route = createFileRoute("/malzeme")({ component: MalzemePage });

function MalzemePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Satın alma</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Malzeme listesi</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {CLUB.groupSize}. Sütunlar 8 takım + %20 yedek içindir. Faz  sütunu, parçanın ilk kullanıldığı haftadır — tüm
        siparişi Eylül’de vermek en ucuzu, motor ve şaseyi Şubat’ta almak da mümkündür.
      </p>
      <div className="mt-8 overflow-x-auto rounded-lg bg-paper shadow-[var(--shadow-card)]">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-faint">
              <th className="px-4 py-3 font-medium">Parça</th>
              <th className="px-4 py-3 font-medium">Takım</th>
              <th className="px-4 py-3 font-medium">8 takım</th>
              <th className="px-4 py-3 font-medium">Faz</th>
              <th className="px-4 py-3 font-medium">Not</th>
            </tr>
          </thead>
          <tbody>
            {BOM.map((row) => (
              <tr key={row.item} className="border-b border-line/70 align-top">
                <td className="px-4 py-3 font-medium">{row.item}</td>
                <td className="px-4 py-3 tabular-nums">{row.qtyPerTeam}</td>
                <td className="px-4 py-3 tabular-nums">{row.teamsOf8}</td>
                <td className="px-4 py-3 text-muted">{row.phase}</td>
                <td className="px-4 py-3 text-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
