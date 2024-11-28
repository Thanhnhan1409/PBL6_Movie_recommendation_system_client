import { signupChild } from "@/lib/api/auth";
import { useLoadingStore } from "@/stores/loading";
import { ChildUserSignup } from "@/types";
import { Button, DatePicker, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import "../styles/sign-up.css"
import { useProfileStore } from "@/stores/profile";

const AddChildAccount = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const loadingStore = useLoadingStore();
  const profileStore = useProfileStore();

  const showModal = () => {
    setOpen(true);
  }

  const addChildAcc = async (record: ChildUserSignup) => {
    try {
      loadingStore.setIsLoading(true);
      const data = {
        ...record,
        age: new Date().getFullYear() - new Date(record.age?? '').getFullYear()
      }
      const res = await signupChild(data);
      profileStore.setActiveProfile({
        ...data,
        avatar: `/images/Netfli${++profileStore.childrenProfiles.length}.png`
      });
      profileStore.setChooseProfile(true);
      notification.success({
        message: 'Added account!',
        description: res?.data?.detail ?? 'Added account successfully!',
      });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Add account failed!',
        description: error?.response?.data?.detail ?? 'Add account failed!',
      });
    } finally {
      loadingStore.setIsLoading(false);
    }
  }

  return (
    <div className="relative">
      <Button onClick={showModal} className="w-[156px] h-[156px] border rounded cursor-pointer hover:shadow-md hover:shadow-[#424449]">
        <div className="text-[4rem] w-full h-full flex justify-center items-center text-white hover:text-[#000]">+</div>
      </Button>
      <Modal
        open={open}
        title="Title"
        onCancel={() => setOpen(false)}
        width={500}
        // className="w-full rounded-md bg-[#000000b3] p-14 backdrop-blur-lg"
        styles={{
          content: {
            backgroundColor: '#262524',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.5rem',
            padding: '3.5rem',
          },
          header: {
            display: 'none',
          },
          footer: {
            display: 'none'
          }
        }}
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-white">Add child Account</h1>
        <Form
          name="data"
          initialValues={{ remember: true }}
          onFinish={addChildAcc}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            name="fullname"
            rules={[{ required: true,  message: 'Please input your full name!' }]}
          >
            <Input
              placeholder="Full name"
              className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            />
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{required: true, message: 'Please input your birthday!' }]}
          >
            <DatePicker
              disabledDate={(current) => current && current.valueOf() > Date.now()}
              placeholder="Your birthday"
              className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            />
          </Form.Item>
          <Form.Item label={null} className="mt-3">
            <Button type="primary" htmlType="submit" size="large" className="inline-block w-full text-white bg-[red] hover:outline-none focus:bg-[black] border-0 hover:bg-[#000] hover:text-[#8696A5]">
              Add account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddChildAccount;