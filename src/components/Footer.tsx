export default function Footer() {
  return (
    <footer>
      <div className=" bg-black text-white h-40 pt-12">
        <h5 className="text-center">Book Catalog</h5>
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
