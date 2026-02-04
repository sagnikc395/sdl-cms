'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import courseData from './courses/systems-for-deep-learning.json';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Please sign in to view the course
        </h1>
        <button
          onClick={() => signIn('github')}
          className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-gray-800 dark:bg-black dark:text-gray-200">
      <header className="flex items-center justify-between bg-white p-4 dark:bg-gray-800">
        <h1 className="text-xl font-bold">Systems for Deep Learning</h1>
        <button
          onClick={() => signOut()}
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Sign out
        </button>
      </header>
      <main className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {courseData.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            {courseData.description}
          </p>
        </div>

        <div className="space-y-12">
          {courseData.modules.map((module, moduleIdx) => (
            <div key={moduleIdx} className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold">
                {module.title}
              </h2>
              <ul className="space-y-3">
                {module.readings.map((reading, readingIdx) => (
                  <li key={readingIdx} className="flex items-center">
                    <a
                      href={reading.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {reading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
