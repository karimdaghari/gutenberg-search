This is a take-home assignment/project for SignHouse.

It's a very minimalist alternative front for Gutenberg built with Next.js using the [Gutendex](https://gutendex.com/) API that only allows for two things: searching for a book (with infinite scroll) and an ability to 'pick' a book to add it to a "To Read" list.

## Getting Started

### Run it locally

*Note: This project was developed using pnpm and was not tested on either npm/yarn, although that shouldn't cause any issues I cannot guarantee it.*

First, make sure to install the required dependencies.

```bash
npm i
# or
yarn i
# or
pnpm i
```

Then run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

That's it!

## Tech used

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React Query](https://tanstack.com/query/latest/docs/react/overview) with [Axios](https://axios-http.com/)
- [Mantine](https://mantine.dev/) with [Lucide icons](https://lucide.dev/)

## Project structure

The project, despite being relatively simple, loosely follows the [react-bulletproof](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) structure as in my humble experience it worked out really great for me throughout the years (regardless of project complexity).

And I like my stuff to be neat.

## Q&A

### Why React Query?

Because it streamlines and simplifies data fetching.

### Why Axios instead of native `fetch`?

Convenience and feature-set. For instance Axios allows for better error handling (whereas `fetch` doesn't have any) and automatically serializes parameters (amongst other things).

### Why Mantine instead of

#### TailwindCSS, DaisyUI and the likes

Using a component library allows for faster iteration.

Although I'm quite proficient in Tailwind and know it like the back of my hand, it's not really fit for the job as I would have to build everything for scratch.

#### MUI, AntUI and the likes

I don't have anything against the other libraries, it's a matter of personal preference.

### Why did you use CSR instead of SSR?

Since there's no SEO-related need to address, from a UX perspective CSR is better as it's *seemingly, perceivably* faster, for instance: it's better to show a skeleton than a blank page even though the load time is more or less the same (although technically there **is** a difference, it's negligible and doesn't justify the cost incurred from a UX perspective).

### Why are there no tests?

I believe that tests are a form of premature optimization. Don't get wrong, from a technical perspective they're important but they require that certain conditions be met like, *but not limited to*:

- Testing things manually would take a lot more time than doing automated testing.
- The project is stable enough that most of it requirements are well set.
- There's a team of at least 3 working on various components of the project.

## Things that could be improved

Although I'm fairly satisfied with the work I've done here, there's two things that IMO would make me 100% satisfied:

1. More granular error handling (for instance the case for an error that occurs while fetching a new page (infinite loading) shouldn't block the whole list)
2. Write tests (but then again, this is me being a perfectionist)
