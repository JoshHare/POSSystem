"use client"; // necessary for useState to work
import { NextResponse } from "next/server";
import styles from './page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Home() {
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data

    const [apiResponse, setApiResponse] = useState(null);

    const fetchMenu = async () => {
        const response = await fetch('/api/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }
    const placeOrder = async () => {
        const orderData = { // Define orderData as an object
            order_timestamp: "2023-10-29 14:33:00",
            employee_id: 1,
            customer_id: 2,
            order_items: ["item1", "item2"],
            order_total: 25.00,
            drink_attributes: ["item1", "item2"],
            drink_addons: ["item1", "item2"],
        };
    
        try{
            const response = await fetch("/api/placeOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if(response.ok){
                // If the response status is OK (200), parse the JSON response
                const data = await response.json();
                alert(`Order added successfully. Order ID: ${data.order_id}`);
            }
            else{
                const errorData = await response.json();
                console.error("Error from API:", errorData);
                alert(`Error: ${errorData.error}`);
            }
        }catch(error){
            console.error('Error fetching API:', error);
        }
    }
    useEffect(() => {
        fetchMenu();
    },[]);    

    return (
        <>
            <Navbar />
            <div className={styles.main}>
                <h1>Cashier Page</h1>
                <button onClick={placeOrder}>Test placeOrder API Endpoint</button>
                
                {menuData.map((menuItem, index) => (
                    <div className={styles.imageContainer} key={index}>
                        {/* Wrap the Image inside a Link so it's clickable */}
                        <Link href={`http://localhost:3000/cashier`}>
                                <Image
                                    src="/images/brownsugarimgj.jpg"
                                    alt={`Boba Drink ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className={styles.image}
                                />
                        </Link>
                        <p>Boba Drink {index + 1}</p>
                        <p>Drink Name: {menuItem.name}</p>
                    </div>
                ))}
                
                <div className={styles.pContainer}>
                    <p className={styles.pItem}><Link href="/cashier/fruityAndRefreshing">Fruity and Refreshing</Link></p>
                    <p className={styles.pItem}><Link href="/cashier/sweetAndCreamy">Sweet and Creamy</Link></p>
                    <p className={styles.pItem}><Link href="/cashier/coffeeFlavored">Coffee Flavored</Link></p>
                    <p className={styles.pItem}><Link href="/cashier/seasonalDrinks">Seasonal Drinks</Link></p>
                </div>
            </div>
            <Footer />
        </>
    );
}

