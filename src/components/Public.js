import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public flex items-center justify-center flex-col text-center h-full -mt-16">
            {/* <header>
                <h1 className='text-red-500'>Hai teman teman</h1>
                <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Foo City, Dan D. Repairs  provides a trained staff ready to meet your tech repair needs.</p>
                <address className="public__addr">
                    Dan D. Repairs<br />
                    555 Foo Drive<br />
                    Foo City, CA 12345<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Dan Davidson</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
                </footer> */}
            <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-2xl '>Welcome to</p>
            <h1 className='text-primaryBlue text-8xl font-bold [text-shadow:_0_4px_7px_rgb(0_0_0_/_40%)]'>Bengkel Laptop</h1>
            <p className='font-bold text-2xl text-primaryBlue mt-2 [text-shadow:_0_4px_7px_rgb(0_0_0_/_20%)]'>Notes Managament App</p>
            <Link className='bg-primaryBlue mt-4 font-semibold italic text-xl py-1 text-primaryLight px-8 rounded-md duration-200 hover:duration-200 hover:bg-white hover:text-primaryBlue' to="/login">Login to Continue</Link>
            
        </section>

    )
    return content
}
export default Public