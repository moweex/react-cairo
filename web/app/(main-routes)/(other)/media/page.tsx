import { HOUR } from '@lib/constants';
import { getMedia } from '@lib/cms-providers/dato';
import { MediaItem } from 'app/components/media-item';

export default async function MediaPage() {
  const content = await getMedia({ revalidate: HOUR });

  return (
    <div className="w-full bg-opacity-30 bg-black z-10 pt-10 pb-10">
      {content.map(gallery => {
        const images = gallery.content;

        return (
          <div key={gallery.id} className="mt-20 z-10">
            <h3 className="text-2xl text-center md:text-4xl uppercase font-extrabold tracking-[0.2em] ">
              {gallery.title}
            </h3>
            <section className="w-full pt-10 pb-10 grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-2 md:px-8">
              {images.map(galleryItem => (
                <MediaItem
                  key={
                    galleryItem.type === 'image'
                      ? galleryItem.id
                      : galleryItem.url
                  }
                  galleryItem={galleryItem}
                />
              ))}
            </section>
          </div>
        );
      })}
    </div>
  );
}
