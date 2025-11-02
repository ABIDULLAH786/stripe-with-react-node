import axios from "axios";
import { Check } from "lucide-react";
import Button from "../Components/Button";

const plans = [
    {
        id: "introduction",
        name: "Introduction",
        price: "$10",
        priceId: "price_1SOtP9Cq0KFgZIAaMSwftTYT", //the id for the plan/subscription price in the stripe prodcut catalog
        features: ["1 project", "Basic support", "Limited Notes"],
        buttonColor: "bg-gray-700 hover:bg-gray-800",
        image: "https://static-assets.codecademy.com/assets/course-landing-page/meta/16x9/learn-react-introduction.jpg",
        link: "https://www.codecademy.com/learn/learn-react-introduction",
    },
    {
        id: "intermediate",
        name: "Intermediate",
        price: "$25",
        priceId: "price_1SOtfuCq0KFgZIAawFfs3qn2",//the id for the plan/subscription price in the stripe prodcut catalog
        features: ["3 projects", "Priority support", "Detailed notes"],
        buttonColor: "bg-indigo-600 hover:bg-indigo-700",
        image: "https://static-assets.codecademy.com/assets/course-landing-page/meta/16x9/learn-react-additional-basics.jpg",
        link: "https://www.codecademy.com/learn/learn-react-additional-basics"
    },
    {
        id: "advance",
        name: "Advance",
        price: "$50",
        priceId: "price_1SOtmyCq0KFgZIAa32E7S0lq", //the id for the plan/subscription price in the stripe prodcut catalog
        features: ["5+ projects", "24/7 Support", "Advance notes"],
        image: "https://static-assets.codecademy.com/assets/course-landing-page/meta/16x9/learn-advanced-react.jpg",
        link: "https://www.codecademy.com/learn/learn-advanced-react",
        buttonColor: "bg-green-600 hover:bg-green-700",
    },
];

export default function Plans() {
    const handleSubscribe = async (planId) => {
        try {
            const email = "testuser@example.com"; // Replace with logged-in user email
            const { data } = await axios.post(
                `${import.meta.env.VITE_BE_SERVER_URL}/api/stripe/create-subscription-session`,
                { plan: planId, email }
            );
            console.log({ data });

            window.location.href = data.url;
        } catch (err) {
            console.error(err);
            alert("Subscription error, check console.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <h2 className="text-center text-3xl font-bold mb-10">
                Choose Your Plan
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white shadow-lg rounded-2xl p-8 w-80 text-center hover:shadow-xl transition-all"
                    >
                        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                        <p className="text-3xl font-bold mb-6">{plan.price}/yr</p>

                        <ul className="text-gray-600 mb-6 space-y-2">
                            {plan.features.map((feat, i) => (
                                <li key={i} className="flex items-center justify-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" /> {feat}
                                </li>
                            ))}
                        </ul>

                        <Button variant="primary" onClick={() => handleSubscribe(plan.id)}>Subscribe</Button>

                    </div>
                ))}
            </div>
        </div>
    );
}
