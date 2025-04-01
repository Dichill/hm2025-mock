import { useState, useRef, useEffect } from "react"

const FAQ_component = () => {
  return (
    <section className="-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="accordion-group" data-accordion="default-accordion">
                <FAQ_Question heading="Who is the Hackathon open to?" 
                text="The 2025 Hackathon is open to all students, faculty, and staff in the
                Los Angeles Community College District."/>

                <FAQ_Question heading="How do I apply?" 
                text="Stay tuned. Our application portal will be opening in the next few weeks."/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default FAQ_component

interface FAQ_Question__Props {
  heading: string;
  text: string;
}

const FAQ_Question = (props: FAQ_Question__Props) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [open]);

  return (
    <div className="m-3 border-3 border-solid rounded-xl border-white overflow-hidden">
      <button 
        className="w-full" 
        onClick={() => setOpen(!open)}
      >
        <div className="accordion p-8 active" id="basic-heading-one-with-arrow-always-open">
          <FAQ_Question_Header open={open} text={props.heading}/>
        </div>
      </button>
      <div 
        className="transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: open ? contentHeight : 0,
          opacity: open ? 1 : 0
        }}
      >
        <div 
          ref={contentRef}
          className="px-8 pb-8"
        >
          <p className=" text-white text-lg font-normal">
            {props.text}
          </p>
        </div>
      </div>
    </div>
  )
}

interface FAQ_Question_Header__Props {
  open: boolean;
  text: string;
}


const FAQ_Question_Header = (props: FAQ_Question_Header__Props) => {
  return (
    <div className="accordion-toggle group inline-flex items-center justify-between text-2xl font-normal leading-8 text-white w-full" aria-controls="basic-collapse-one-with-arrow-always-open">
      <h5 className="text-white font-bold">{props.text}</h5>
      <svg 
        className={`text-white transition-transform duration-300 ${props.open ? 'rotate-180' : ''}`} 
        width="22" 
        height="22" 
        viewBox="0 0 22 22" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25" 
          stroke="currentColor" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}