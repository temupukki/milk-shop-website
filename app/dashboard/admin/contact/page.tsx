"use client";
import { useEffect, useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiClock } from "react-icons/fi";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submit-form/display");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center py-8">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center py-8 text-red-500">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <title>Contact Management| Pukki milk</title>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rose-800 mb-2">
            Contact Submissions
          </h1>
          <p className="text-rose-600">View customer messages</p>
        </div>

        {/* Scroll wrapper for table */}
        <div className="bg-white rounded-xl shadow-md border border-rose-100 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-rose-50">
              <tr>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Name
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Email
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Message
                </th>
                <th className="p-4 text-left text-rose-800 font-semibold">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100">
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="hover:bg-rose-50 transition-colors"
                >
                  <td className="p-4 font-medium text-rose-700 flex items-center gap-2 whitespace-nowrap">
                    <FiUser className="text-rose-600" />
                    {submission.name}
                  </td>
                  <td className="p-4 text-rose-700 whitespace-nowrap">
                    <a
                      href={`mailto:${submission.email}`}
                      className="flex items-center gap-2 hover:text-rose-600 hover:underline"
                    >
                      <FiMail className="text-rose-600" />
                      {submission.email}
                    </a>
                  </td>
                  <td className="p-4 text-rose-700">
                    <div className="flex items-start gap-2">
                      <FiMessageSquare className="text-rose-600 mt-1" />
                      <p className="line-clamp-2">{submission.message}</p>
                    </div>
                  </td>
                  <td className="p-4 text-rose-700 flex items-center gap-2 whitespace-nowrap">
                    <FiClock className="text-rose-600" />
                    {new Date(submission.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-12 text-rose-700">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
