import React from 'react'
import CustomInput from '../Components/CustomInput'

const Fotgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Fotgot password</h3>
        <p className="text-center">Please Enter your register email to get reset password mail.</p>
        <form action="">
          <CustomInput
            type="password"
            label="New Password"
            id="pass"
            name="pass"
          />
          
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default Fotgotpassword