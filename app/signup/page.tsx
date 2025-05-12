"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    
    // Here you would add your registration logic
    // For example, call your API to register the user
    
    // For demo purposes, just redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth signup
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleFacebookSignup = () => {
    // Implement Facebook OAuth signup
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col gap-12 items-center justify-center px-4 py-8 sm:px-8 md:px-16 bg-white">
  <div>
    <Image 
      src="/img/logobigw.png" 
      alt="FarmLand Logo" 
      width={198} 
      height={30} 
      className="mx-auto"
    />
  </div>

  <div className="w-full max-w-xl p-6 sm:p-8 space-y-6 bg-white rounded-2xl border border-[#e8e8e8]">
    <div className="text-center">
      <h2 className="text-[#606060] text-2xl sm:text-3xl font-normal font-sora">Create an account</h2>
      <p className="mt-2 text-sm text-[#606060] font-sora">
        Sign up to get started with FarmLand
      </p>
    </div>

    <div className="space-y-4">
      {/* Social Signup Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGoogleSignup}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-[#e0e0e0] rounded-full bg-[#fafafa] hover:bg-gray-50 transition"
          disabled={isLoading}
        >
          <Image src="/icons/google.png" alt="Google" width={20} height={20} />
          <span className="font-sora text-[#4f4f4f] text-base">Signup with Google</span>
        </button>

        <button
          onClick={handleFacebookSignup}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-[#e0e0e0] rounded-full bg-[#fafafa] hover:bg-gray-50 transition"
          disabled={isLoading}
        >
          <Image src="/icons/facebook.png" alt="Facebook" width={20} height={20} />
          <span className="font-sora text-[#4f4f4f] text-base">Signup with Facebook</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or create an account with email</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Input Fields */}
        {[{
          label: "Full Name",
          id: "fullName",
          type: "text",
          value: fullName,
          setValue: setFullName,
          placeholder: "Enter your full name",
        }, {
          label: "Email address",
          id: "email",
          type: "email",
          value: email,
          setValue: setEmail,
          placeholder: "Enter your email",
        }, {
          label: "Password",
          id: "password",
          type: "password",
          value: password,
          setValue: setPassword,
          placeholder: "Create a password",
        }, {
          label: "Confirm Password",
          id: "confirmPassword",
          type: "password",
          value: confirmPassword,
          setValue: setConfirmPassword,
          placeholder: "Confirm your password",
        }].map(({ label, id, type, value, setValue, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium font-sora text-gray-700">
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
        ))}

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="text-sm text-gray-700 font-sora">
            I agree to the <a href="#" className="text-[#1a382c] hover:text-[#2e6650]">Terms of Service</a> and <a href="#" className="text-[#1a382c] hover:text-[#2e6650]">Privacy Policy</a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-full text-base font-medium text-white bg-[#2e6650] hover:bg-[#1a382c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>

    {/* Link to login */}
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-[#1a382c] hover:text-[#2e6650] font-sora">
          Sign in
        </Link>
      </p>
    </div>
  </div>
</div>

  );
}