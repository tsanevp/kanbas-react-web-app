import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState<any>({});

    const fetchProfile = useCallback(async () => {
        try {
            if (!currentUser) {
                navigate("/Kanbas/Account/Signin");
                return;
            }
            const fetchedProfile = await client.findUserById(currentUser._id);
            setProfile(fetchedProfile);
        } catch (error) {
            console.error("Error fetching profile:", error);
            // Optionally, handle error (e.g., show an error message)
        }
    }, [currentUser, navigate]);

    const updateProfile = async () => {
        try {
            const updatedProfile = await client.updateUser(profile);
            dispatch(setCurrentUser(updatedProfile));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const signout = async () => {
        try {
            await client.signout();
            dispatch(setCurrentUser(null));
            navigate("/Kanbas/Account/Signin");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <input defaultValue={profile.username} id="wd-username" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <input defaultValue={profile.password} id="wd-password" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <input defaultValue={profile.dob} id="wd-dob" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
                    <input defaultValue={profile.email} id="wd-email" className="form-control mb-2"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <select value={profile.role}  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="form-control mb-2" id="wd-role">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
                    <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}