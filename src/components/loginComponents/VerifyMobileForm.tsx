import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import PhoneNumInputField from "../commonComponents/PhoneNumInputField";
import { verifyMobileSchema } from "../../schemas/schema";
import { COUNTRY_CODES,} from "../../utils/BasicDetailsConstants";
import { watch } from "fs";

type VerifyMobileFormValues = {
    countryCode: string;
    phone: string;
};

const VerifyMobileForm = () => {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyMobileFormValues>({
        resolver: zodResolver(verifyMobileSchema),
        defaultValues: {
            countryCode: "+91",
            phone: "",
        },
    });
   
    const navigate = useNavigate();

    const onSubmit = (data: VerifyMobileFormValues) => {
        console.log("Verify Mobile Data:", data);
        navigate("/otp");
    }


    return (
        <div className="w-full max-w-md p-2 ">
            <div className="text-center mb-2 md:mb-4">
            <Title text="Verify your Mobile Number"/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <PhoneNumInputField 
                    label="Mobile Number"
                    codeName="countryCode"
                    numberName="phone"
                    setValue={setValue}
                    watch={watch}
                    // placeholder="Enter mobile number"
                    // register={register}
                    // value={phone} 
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //     setPhone(e.target.value)}
                    errors={{ code: errors.countryCode,
                            number: errors.phone,}}
                     countryCodes={COUNTRY_CODES}/>
                    <button type="submit" 
                    // onClick={handleGetOtp}
                     className="w-full bg-[#168BD9] text-white py-3 text-base rounded-xl">
                        Get OTP
                    </button>
            </form>
        </div>
    );
};
export default VerifyMobileForm;

