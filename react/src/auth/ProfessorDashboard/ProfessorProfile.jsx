import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

const ProfessorProfile = () => {
    const { user, token } = useStateContext();
    const [professor, setProfessor] = useState(null);

    useEffect(() => {
        if (user?.id) {
            fetchProfessor();
        }
    }, [user]);

    const fetchProfessor = async () => {
        try {
            const response = await axiosClient.get(`/professors/user/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStudent(response.data.data);
        } catch (error) {
            console.error("Error fetching professor:", error);
        }
    };

    return (
        <div>
            <div className="flex-1 flex flex-col">
                <header className="bg-background border-b border-border p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Welcome back, {user?.firstname} {user?.lastname}
                            </h1>
                            <p className="text-muted-foreground">
                                Here's your academic overview for today
                            </p>
                        </div>
                    </div>
                </header>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4">Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Personal Details</h3>
                            <p>
                                <span className="font-medium">Name:</span> {user?.firstname} {user?.lastname}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {user?.email}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span> {user?.phone || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium">Birthdate:</span> {user?.birthdate || "N/A"}
                            </p>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfessorProfile;