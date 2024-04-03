import Head from 'next/head';
import React from 'react';

interface MetaTagsProps {
    image?: string;
    title?: string;
    description?: string;
    url?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
    image = 'https://yourdomain.com/path-to-your-og.jpg',
    title = 'Your Website Title',
    description = 'Your website description',
    url = 'https://yourdomain.com',
}) => {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Head>
    );
}

export default MetaTags;
