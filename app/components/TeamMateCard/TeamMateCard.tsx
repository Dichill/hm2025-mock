"use client";

const TeamMateCard = () => {
  return (
    <div className="w-full max-w-3xs perspective-1000">
      <div 
        className="relative w-full h-full transition-transform duration-500 transform-style-3d hover:rotate-y-180 md:hover:rotate-y-180"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div className="w-full h-full backface-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4">
          </div>
          <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/sb.jpg" alt="SpongeBob" />
            <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">SpongeBob SquarePants</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Lead Jellyfisher</span>
            <div className="flex mt-4 md:mt-6">
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="relative w-full h-full backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            <h5 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">About SpongeBob</h5>
            <p className="text-gray-600 dark:text-gray-300">
              SpongeBob is a dedicated jellyfisher with over 10 years of experience in the field. 
              Hes known for his innovative techniques and has won multiple awards for his contributions 
              to the jellyfishing industry. When not working, he enjoys karate and playing with his best friend Patrick.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamMateCard;


