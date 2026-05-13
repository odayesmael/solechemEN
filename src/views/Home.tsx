import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { IndustriesBlock } from '../components/IndustriesBlock';
import { CategoriesGrid } from '../components/CategoriesGrid';
import { ProductSearch } from '../components/ProductSearch';
import { Values } from '../components/Values';
import { ManufacturingTeaser } from '../components/ManufacturingTeaser';
import { CTA } from '../components/CTA';
import { TrustedBy } from '../components/TrustedBy';

export function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <IndustriesBlock />
      <About />
      <CategoriesGrid />
      <ProductSearch />
      <Values />
      <TrustedBy />
      <ManufacturingTeaser />
      <CTA />
    </>
  );
}
