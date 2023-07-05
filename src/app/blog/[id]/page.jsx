
import styles from '@/styles/pages/blogSingle.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getData(id) {
  // Localhost
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: 'no-store',
  });
  // Deploy
  // const res = await fetch(`https://js-case-next-13.vercel.app/api/posts/${id}`, {
  //   cache: 'no-store',
  // });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <section className={styles.blogSingle}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>

            <p className={styles.body}>{data.desc}</p>
            <div className={styles.author}>
              <Image
                src={data.img}
                alt=""
                width={40}
                height={40}
                className={styles.avatar}
              />
              <span className={styles.username}>{data.username}</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill={true} className={styles.image} />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.text}>{data.content}</p>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
