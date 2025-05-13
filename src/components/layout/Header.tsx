
const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">CompliancePro</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Navigation buttons will be added to AppLayout instead of here */}
      </div>
    </header>
  );
};

export default Header;
