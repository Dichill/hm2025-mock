


const Schedule = () => {
  return (
    <>
      <ol className="items-center sm:flex">
        <ScheduleElement />
        <Divider />
        <ScheduleElement />
        <Divider />
        <ScheduleElement />
        <Divider />
        <ScheduleElement />
        <Divider />
        <ScheduleElement />
      </ol></>
  )
}

const Divider = () => {


  return (
    <hr className="m-2 md:hidden" style={{ border: "1px solid white" }}></hr>
  )
}

export default Schedule


const ScheduleElement = () => {
  return (
    <li className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
          <svg className="w-4.5 h-4.5 md:w-2.5 md:h-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <div className="hidden sm:flex w-full bg-white h-0.5"></div>
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className="text-lg font-semibold text-white">Flowbite Library v1.0.0</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-white">Released on January 5, 2022</time>
        <p className="text-white">Get started with dozens of web components and interactive elements.</p>
      </div>
    </li>
  )
}