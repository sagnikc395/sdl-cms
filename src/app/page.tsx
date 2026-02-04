'use client';

import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar'; // Import the ProgressBar component

interface Reading {
  id: string;
  title: string;
  url: string;
}

interface Module {
  id: string;
  title: string;
  readings: Reading[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">No courses available.</p>
      </div>
    );
  }

  const courseData = courses[0]; // Assuming we display the first course for now

  // Calculate total readings (placeholder for now)
  const totalReadings = courseData.modules.reduce((acc, module) => acc + module.readings.length, 0);
  const completedReadings = 0; // For now, assume 0 completed readings
  const progress = totalReadings > 0 ? (completedReadings / totalReadings) * 100 : 0;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-gray-800 dark:bg-black dark:text-gray-200">
      <header className="flex items-center justify-between bg-white p-4 dark:bg-gray-800">
        <h1 className="text-xl font-bold">Systems for Deep Learning</h1>
      </header>
      <main className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {courseData.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            {courseData.description}
          </p>
          <div className="mt-6">
            <ProgressBar progress={progress} />
          </div>
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
