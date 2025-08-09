import Hero from '@/components/hero';
import FeaturedCollection from '@/components/featured-collection';
import Story from '@/components/story';
import Newsletter from '@/components/newsletter';
import Gallery from '@/components/gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'MOURDRÉ by Purrquinox',
	description: 'Luxury garments website prototype by Purrquinox.'
};

const Home = () => {
	return (
		<>
			<Hero />
			<FeaturedCollection />
			<Story />
			<Gallery />
			<Newsletter />
		</>
	);
};

export default Home;
