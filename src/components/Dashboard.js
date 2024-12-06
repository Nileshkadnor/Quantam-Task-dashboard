import React from "react";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login";
        return null;
    }

    return (
        <div>
            <h1>Welcome, {user.user.name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.user.name}</td>
                        <td>{user.user.email}</td>
                        <td>{user.user.dob}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
