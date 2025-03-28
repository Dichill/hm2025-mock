const TeamMateCard = () => {
  return (
    <div style={{ boxShadow: "10px 10px 10px rgba(0,0,0,.3)" }} className="w-full max-w-3xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
  )
}
export default TeamMateCard;


