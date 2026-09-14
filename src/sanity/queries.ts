const postListFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  featured,
  regulator,
  tags,
  heroImage{
    ...,
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  },
  category->{
    title,
    "slug": slug.current,
    description
  },
  author->{
    name,
    role
  }
`

const postDetailFields = /* groq */ `
  ${postListFields},
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    }
  },
  sourceUrl,
  sourceLabel,
  disclaimer,
  seoTitle,
  seoDescription,
  ogImage{
    ...,
    asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    }
  },
  author->{
    name,
    "slug": slug.current,
    role,
    bio,
    image{
      ...,
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    }
  }
`

/** Published posts only: scheduled for now or earlier. */
const publishedFilter = /* groq */ `
  _type == "post"
  && defined(slug.current)
  && defined(publishedAt)
  && publishedAt <= now()
`

export const allPostsQuery = /* groq */ `
  *[${publishedFilter}] | order(publishedAt desc) {
    ${postListFields}
  }
`

export const allPostSlugsQuery = /* groq */ `
  *[${publishedFilter}]{ "slug": slug.current }
`

export const postBySlugQuery = /* groq */ `
  *[${publishedFilter} && slug.current == $slug][0] {
    ${postDetailFields}
  }
`

export const featuredPostsQuery = /* groq */ `
  *[${publishedFilter} && featured == true] | order(publishedAt desc) [0...3] {
    ${postListFields}
  }
`

export const recentPostsQuery = /* groq */ `
  *[${publishedFilter}] | order(publishedAt desc) [0...$limit] {
    ${postListFields}
  }
`

export const relatedPostsQuery = /* groq */ `
  *[
    ${publishedFilter}
    && slug.current != $slug
    && (
      category._ref == $categoryId
      || count((tags[@ in $tags])) > 0
    )
  ] | order(publishedAt desc) [0...$limit] {
    ${postListFields}
  }
`

export const postCategoryIdQuery = /* groq */ `
  *[${publishedFilter} && slug.current == $slug][0]{
    "categoryId": category._ref,
    tags
  }
`
