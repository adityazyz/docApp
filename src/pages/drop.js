// To upload multiple files
// import Dropzone from "../../components/Dropzone"
import ImgUpload from "../../components/ImgUpload"

export default function Drop() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Upload Files</h1>
        <ImgUpload className='mt-10 border border-neutral-200 p-16' />
      </div>
    </section>
  )
}