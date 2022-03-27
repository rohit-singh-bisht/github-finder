function Footer() {

    const theYear = new Date().getFullYear();

    return (
       <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
        <p>Copyright &copy; {theYear} &nbsp;|&nbsp; All rights reserved.</p>
       </footer>
    )
}

export default Footer
