const adminSchema = require("../models/adminModel");

const registerAdmin = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // validation
    switch (true) {
      case !fname:
        return res.status(400).send({
          success: false,
          message: "First name is mandatory!",
        });
      case !lname:
        return res.status(400).send({
          success: false,
          message: "Last name is mandatory!",
        });
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email is mandatory!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password is mandatory!",
        });
      default:
        break;
    }

    // ensuring uniqueness
    const adminExists = await adminSchema.find({ email });
    if (adminExists.length) {
      return res.status(400).send({
        success: false,
        message: `We already have an admin named ${
          adminExists[0].fname + " " + adminExists[0].lname
        } against this email.`,
      });
    }

    // registration
    const newAdmin = new adminSchema({ fname, lname, email, password });
    const result = await newAdmin.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Admin registered successfully!",
        data: newAdmin,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while registering the admin.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering the admin.",
      error,
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await adminSchema.find();
    if (admins.length) {
      res.status(200).send({
        success: true,
        message: "Admins fetched successfully!",
        count: admins.length,
        data: admins,
      });
    } else {
      res.status(204).send({
        success: true,
        message: "No admins so far.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching the admins.",
      error,
    });
  }
};

const getSingleAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminSchema.findById(id);
    if (admin) {
      res.status(200).send({
        success: true,
        message: "Admin fetched successfully!",
        data: admin,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Admin not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching the admin.",
      error,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    switch (true) {
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email is mandatory!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password is mandatory!",
        });
      default:
        break;
    }

    const admin = await adminSchema.findOne({ email, password });
    if (admin) {
      res.status(200).send({
        success: true,
        message: "Login successfully!",
        data: admin,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Wrong credentials.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while loging in the admin.",
      error,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { fname, lname, email, password } = req.body;

    const admin = await adminSchema.findById(id);
    if (!admin) {
      res.status(404).send({
        success: false,
        message: "Admin not found.",
      });
    }

    // validation
    switch (true) {
      case !fname:
        return res.status(400).send({
          success: false,
          message: "First name cannot be empty!",
        });
      case !lname:
        return res.status(400).send({
          success: false,
          message: "Last name cannot be empty!",
        });
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email cannot be empty!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password cannot be empty!",
        });
      default:
        break;
    }

    // editing
    const editedAdmin = await adminSchema.findByIdAndUpdate(
      id,
      {
        fname, lname, email, password
      },
      { new: true }
    );
    if (editedAdmin) {
      res.status(200).send({
        success: true,
        message: "Admin's information edited successfully!",
        data: editedAdmin,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while editing the admin.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while editing the admin.",
      error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const admin = await adminSchema.findById(id);
    if (!admin) {
      res.status(404).send({
        success: false,
        message: "Admin not found.",
      });
    }

    // deleting data in referenced documents (if needed...)
    // deleting
    const deletedAdmin = await adminSchema.findByIdAndDelete(id);
    if (deletedAdmin) {
      res.status(200).send({
        success: true,
        message: "Admin deleted successfully!",
        data: deletedAdmin,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while deleting the admin.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting the admin.",
      error,
    });
  }
};

module.exports = { registerAdmin, getAdmins, getSingleAdmin, loginAdmin, editAdmin, deleteAdmin };
