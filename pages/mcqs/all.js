import dynamic from "next/dynamic";
import AllMcqs from "../../clientPages/AllMcqs";

export default dynamic(() => Promise.resolve(AllMcqs), { ssr: false });
