import Hero from '@/components/hero';
import FeaturedCollection from '@/components/featured-collection';
import Story from '@/components/story';
import Newsletter from '@/components/newsletter';
import Gallery from '@/components/gallery';

export default function Home() {
	return (
		<>
			<Hero />
			<FeaturedCollection />
			<Story />
			<Gallery />
			<Newsletter />
		</>
	);
}
