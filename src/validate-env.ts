import * as yup from 'yup'

interface EnvVariables {
    NODE_ENV: string
    NEXT_PUBLIC_SITE_URL: string
    LOCATIONIQ_API_URL: string
    LOCATIONIQ_API_KEY: string
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string
}

const defaultValues: EnvVariables = {
    NODE_ENV: 'development',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    LOCATIONIQ_API_URL: 'SHOULD_BE_SET',
    LOCATIONIQ_API_KEY: 'SHOULD_BE_SET',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'SHOULD_BE_SET',
}

const envSchema = yup.object().shape(
    Object.keys(defaultValues).reduce(
        (schema, key) => {
            schema[key as keyof EnvVariables] = yup
                .string()
                .required(`${key} is required. Default: "${defaultValues[key as keyof EnvVariables]}"`)
            return schema
        },
        {} as Record<keyof EnvVariables, yup.StringSchema>,
    ),
)

export default function validateEnv() {
    const bold = '\x1b[1m'
    const red = '\x1b[31m'
    const green = '\x1b[32m'
    const reset = '\x1b[0m'

    try {
        envSchema.validateSync(process.env, { abortEarly: false })
        console.log(` ${bold}${green}✓${reset} Environment variables validation passed`)
    } catch (error) {
        console.error(` ${bold}${red}✗${reset} Environment variables validation failed:`)
        if (error instanceof yup.ValidationError) {
            error.inner.forEach(err => {
                console.error(`   - ${err.message}`)
            })
        }
        console.log(`   Please update the environment variables and relaunch the application.`)
    }
}
