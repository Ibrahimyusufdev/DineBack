import { useNavigate } from "react-router-dom";





export const HomePage = () => {

    const navigate = useNavigate();
    
  return (
    <section className="mt-4">
      <div className="container mx-auto px-4">
        <h1 className="text-center">Dine, Delight, and Earn Cash Back!</h1>
        <p className="text-center">Turn every date night into an opportunity to earn. Get rewarded  for your time and taste.</p>
        <div className="flex gap-4">
          <button onClick={() => navigate("/diners/signup")} className="btn-secondary">Start Earning Now</button>
          <button onClick={() => navigate("/restaurant/signup")} className="btn-primary">Partner With Us</button>
        </div>
      </div>
    </section>
  );
};
