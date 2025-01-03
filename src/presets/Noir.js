import { definePreset } from '@primevue/themes';
        import Aura from '@primevue/themes/aura';

        const Noir = definePreset(Aura, {
            semantic: {
                primary: {
                    50: '{purple.50}',
                    100: '{purple.100}',
                    200: '{purple.200}',
                    300: '{purple.300}',
                    400: '{purple.400}',
                    500: '{purple.500}',
                    600: '{purple.600}',
                    700: '{purple.700}',
                    800: '{purple.800}',
                    900: '{purple.900}',
                    950: '{purple.950}'
                },
                colorScheme: {
                    light: {
                        primary: {
                        color: '{primary.950}',
                        contrastColor: '#ffffff',
                        hoverColor: '{primary.900}',
                        activeColor: '{primary.800}'
                        },
                        highlight: {
                        background: '{primary.950}',
                        focusBackground: '{primary.700}',
                        color: '#ffffff',
                        focusColor: '#ffffff'
                        },
                        
                    },
                    dark: {
                        primary: {
                        color: '{primary.50}',
                        contrastColor: '{primary.950}',
                        hoverColor: '{primary.100}',
                        activeColor: '{primary.200}'
                        },
                        highlight: {
                        background: '{primary.50}',
                        focusBackground: '{primary.300}',
                        color: '{primary.950}',
                        focusColor: '{primary.950}'
                        }
                    }
                }
            }
        });

        export default Noir;
