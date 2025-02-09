import { ClockLoader } from "react-spinners";


export default function LoadingScreen() {
  return (

    <div className="flex justify-center items-center h-screen">
      <ClockLoader color="#36d7b7" size={50} />
    </div>
  )
}

