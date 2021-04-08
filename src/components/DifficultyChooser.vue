<template>
    <v-item-group>
        <v-container>
            <v-row>
                <v-col cols="12" class="mt-6 mb=-2 text-center">
                <h1>Choose the game difficulty</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="d in [{number: 4, label: 'Easy'},{number: 8, label: 'Medium'},{number: 12, label: 'Hard'}]"
                                    :key="d.number" cols="12" sm="4">
                <v-item v-slot="{ active, toggle }">
                    <v-card :color="active ? 'primary' : 'secondary'"
                    class="d-flex align-center" dark height="200"
                    @click="toggle() || $emit('set-difficulty', d.number)">
                    <v-card-text class="text-center text--white">
                        <h1 class="mb-2">{{ d.label }}</h1>
                        <h3>Play with {{ d.number }} cards</h3>
                    </v-card-text>
                    </v-card>
                </v-item>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>