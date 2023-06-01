import dynamic from "next/dynamic";
import Account from "../clientPages/Account";

export default dynamic(() => Promise.resolve(Account), { ssr: false });
