import {
    pgTable,
    integer,
    varchar,
    timestamp,
    text,
    date,
    primaryKey,
} from 'drizzle-orm/pg-core';

export const users = pgTable('Users', {
    id: integer('id').primaryKey(),
    username: varchar('username'),
    role: varchar('role'),
    createdAt: timestamp('created_at'),
});

export const organizations = pgTable('Organizations', {
    id: integer('id').primaryKey(),
    name: text('name'),
    description: text('description'),
});

export const dishes = pgTable('Dishes', {
    id: integer('id').primaryKey(),
    name: text('name'),
    type: text('type'),
});

export const dishesPermission = pgTable(
    'DishesPermission',
    {
        dishId: integer('dishId').references(() => dishes.id),
        orgId: integer('orgId').references(() => organizations.id),
    },
    (table) => ({
        pk: primaryKey(table.dishId, table.orgId),
    })
);

export const schedule = pgTable('schedule', {
    id: integer('id').primaryKey(),
    orgId: integer('orgId').references(() => organizations.id),
    meals: text('meals').array(),
    headerFromText: text('headerFromText'),
    headerToText: text('headerToText'),
});

export const daySchedules = pgTable('DaySchedules', {
    id: integer('id').primaryKey(),
    scheduleId: integer('scheduleId').references(() => schedule.id),
    day: date('day'),
});

export const rowHeaders = pgTable(
    'RowHeaders',
    {
        scheduleId: integer('scheduleId').references(() => schedule.id),
        meal: text('meal'),
        headerText: text('headerText'),
        subHeaderText: text('subHeaderText').array(),
    },
    (table) => ({
        pk: primaryKey(table.scheduleId, table.meal),
    })
);

export const mealOptions = pgTable('MealOptions', {
    ownerOrgId: integer('ownerOrgId'),
    meal: text('meal').primaryKey(),
});

export const mealInDay = pgTable(
    'MealInDay',
    {
        dayScheduleId: integer('dayScheduleId').references(
            () => daySchedules.id
        ),
        meal: text('meal').references(() => mealOptions.meal),
        dishId: integer('dishId').array(),
    },
    (table) => ({
        pk: primaryKey(table.dayScheduleId, table.meal),
    })
);
