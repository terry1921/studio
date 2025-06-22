import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
  stickerMule: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M15.526 15.526C14.073 16.98 12.13 18 10 18H5.828A2 2 0 0 1 4 16.172V12c0-2.13.936-4.113 2.525-5.474"></path>
      <path d="M15.526 8.474C16.98 9.927 18 11.87 18 14v4.172A2 2 0 0 1 16.172 20H12c-2.13 0-4.113-.936-5.475-2.525"></path>
      <path d="M8.474 8.474C9.927 7.02 11.87 6 14 6h4.172A2 2 0 0 1 20 7.828V12c0 2.13-.936 4.113-2.525 5.474"></path>
    </svg>
  ),
  spotify: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M15.22,16.29a.5.5,0,0,1-.7-.09,5.2,5.2,0,0,0-5.06-2.58,5.55,5.55,0,0,0-2.2.44.5.5,0,0,1-.56-.44.5.5,0,0,1,.44-.56,6.56,6.56,0,0,1,2.59-.51,6.22,6.22,0,0,1,6,3.06.5.5,0,0,1-.09.7Z"></path>
      <path d="M15.86,12.55a.5.5,0,0,1-.72-.21,3.7,3.7,0,0,0-3.6-1.84,4,4,0,0,0-1.81.42.5.5,0,0,1-.59-.4.5.5,0,0,1,.4-.59,5,5,0,0,1,2.2-.52,4.64,4.64,0,0,1,4.28,2.2.5.5,0,0,1-.21.72Z"></path>
      <path d="M16.2,8.81A.5.5,0,0,1,15.54,8,2.37,2.37,0,0,0,13.25,7.3a2.53,2.53,0,0,0-1.2.32.5.5,0,0,1-.62-.33.5.5,0,0,1,.33-.62,3.53,3.53,0,0,1,1.68-.43,3.34,3.34,0,0,1,2.83,1.55A.5.5,0,0,1,16.2,8.81Z"></path>
    </svg>
  ),
  appleMusic: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 12a4 4 0 1 0-8 0 4 4 0 1 0 8 0z"></path>
      <path d="M12 12a4 4 0 1 1 8 0 4 4 0 1 1-8 0z"></path>
      <path d="M8 12v-6a4 4 0 1 1 8 0v6"></path>
    </svg>
  ),
  google: (props: SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 48 48"
      {...props}
    >
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.651-3.356-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.617,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  ),
};
