"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "/api";

export const dataProvider = dataProviderSimpleRest(API_URL);
