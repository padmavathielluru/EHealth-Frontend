import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { basicSetUpSchema } from "../schemas/BasicSetUpSchema";
import { BasicSetUpFormValues } from "../interfaces/basicSetUpInterface";
import Title from "../components/Title";
import PersonalInfo from "../components/loginComponents/BasicProfileSetUp/PersonalInfo";
import AddressInfo from "../components/loginComponents/BasicProfileSetUp/AddressInfo";
import ProfileUploadCard from "../components/loginComponents/BasicProfileSetUp/ProfileUploadCard";
import ProfileStepper from "../components/loginComponents/ProfileStepper";

const SetUpProfile: React.FC = () => {
  const saveData = localStorage.getItem("basicProfileData");
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicSetUpFormValues>({
    resolver: zodResolver(basicSetUpSchema),
    defaultValues: saveData ? JSON.parse(saveData) : {
      startDate: "",
    },
  });

  const startDateValue = watch("startDate") ||
    JSON.parse(localStorage.getItem("basicProfileData") || "{}")?.startDate ||
    "";
  const onSubmit: SubmitHandler<BasicSetUpFormValues> = (data) => {
    const payload = {
      ...data,
      hasProfileImage: !!profileImage,
    };

    localStorage.setItem(
      "basicProfileData",
      JSON.stringify(payload)
    );

    navigate("/Professional-details");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12 select-none">
      <div className="w-full max-w-6xl">
        <ProfileStepper currentStep={1} />
        <div className="text-center pb-2">
          <Title text="Basic Profile Setup" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-2">
            <div className="flex justify-center items-center md:justify-start top-10">
              <ProfileUploadCard />
            </div>

            <div className="space-y-2">
              <PersonalInfo<BasicSetUpFormValues>
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                dateOfBirth={startDateValue}
                // setValue={setValue}
                onDateChange={(val) =>
                  setValue("startDate", val, { shouldValidate: true })
                }
              />

              <AddressInfo<BasicSetUpFormValues>
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors} />

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-[211px] h-[49px] bg-[#168BD9] text-white rounded-xl
                             font-medium hover:bg-[#0f76bd] transition-all">
                  Save & Continue
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUpProfile;
