import { useState } from "react"

const FAQ_component = () => {
  return (
    <section className="-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="accordion-group" data-accordion="default-accordion">
                <FAQ_Question />
                <FAQ_Question />
                <FAQ_Question />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default FAQ_component

const FAQ_Question = () => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button className="w-full" onClick={() => setOpen(!open)} >
        <div className="accordion p-8 border-1 m-3 rounded-xl border-solid border-white active" id="basic-heading-one-with-arrow-always-open">
        <FAQ_Question_Header open={open}/>
        </div>
      </button>
    )
  }

  // if open 
  return (
    <button onClick={() => setOpen(!open)} >
      <div className="accordion m-3 p-8 border-1 border-solid rounded-xl  border-white active" id="basic-heading-one-with-arrow-always-open">
        <FAQ_Question_Header open={open}/>
        <div id="basic-collapse-three-with-arrow-always-open" className="accordion-content w-full px-0 overflow-hidden pr-4" aria-labelledby="basic-heading-three-with-arrow-always-open" >
          <p className="text-base text-black font-normal">
            Our focus on providing robust and user-friendly content
            management capabilities ensures that you can manage your
            content with confidence, and achieve your content
            marketing goals with ease.
          </p>
        </div>
      </div>
    </button>
  )
}

interface FAQ_Question_Header__Props {
  open: boolean;
}


const FAQ_Question_Header = (props: FAQ_Question_Header__Props) => {
  let transform;

  if (props.open) {
    transform = "rotate(0)";
  } else {
    transform = "rotate(90)";
  }

  return (
    <button className="accordion-toggle group inline-flex items-center justify-between text-2xl font-normal leading-8 text-white w-full transition duration-500" aria-controls="basic-collapse-one-with-arrow-always-open">
      <h5 className="text-white">How can I reset my password?</h5>
      <svg transform={transform} className="text-white transition duration-500 accordion-active:text-indigo-600 accordion-active:rotate-180" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" ></path>
      </svg>
    </button>
  )
}