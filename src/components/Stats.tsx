import { MoleculeMotif } from './MoleculeMotif';

const stats = [
  { value: '4,480+', label: 'Active Products' },
  { value: '50+', label: 'Countries Served' },
  { value: '1,438+', label: 'Global Partners' },
  { value: '2013', label: 'Established' },
];

export function Stats() {
  return (
    <section className="bg-slate-100 border-b border-slate-200 relative overflow-hidden">
      <MoleculeMotif variant="atoms" intensity="subtle" position="top-left" animated={true} />
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 relative z-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-8 md:p-12 text-center border-b lg:border-b-0 border-r border-slate-200 last:border-r-0"
          >
            <div className="text-3xl md:text-5xl font-black text-brand-dark mb-2">{stat.value}</div>
            <div className="text-xs font-bold text-text-light uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
