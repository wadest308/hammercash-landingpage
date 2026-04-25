import React from 'react';

export default function ProjectHeader({ project }) {
  if (!project) {
    return null; // Or a placeholder
  }

  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="flex items-center">
        {project.streetViewImageUrl ? (
          <img
            src={project.streetViewImageUrl}
            alt="Property Street View"
            className="w-20 h-14 rounded-md object-cover"
          />
        ) : (
          <div className="w-20 h-14 rounded-md bg-gray-100 flex items-center justify-center text-2xl">🏠</div>
        )}
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800">{project.projectName}</h2>
          <p className="text-sm text-gray-500">{project.address}</p>
        </div>
      </div>
    </div>
  );
}
