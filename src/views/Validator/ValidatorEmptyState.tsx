import { Box, Button, Spinner, Text } from '@radix-ui/themes'
import { CircleCheckIcon } from 'lucide-react'

import { ProxyHealthWarning } from '@/components/ProxyHealthWarning'
import { TextButton } from '@/components/TextButton'
import { useProxyHealthCheck } from '@/hooks/useProxyHealthCheck'
import { useProxyStatus } from '@/hooks/useProxyStatus'
import { useStudioUIStore } from '@/store/ui'

interface ValidatorEmptyStateProps {
  isRunning: boolean
  isScriptSelected: boolean
  onRunScript: () => void
  onSelectScript: () => void
}

export function ValidatorEmptyState({
  isRunning,
  isScriptSelected,
  onRunScript,
  onSelectScript,
}: ValidatorEmptyStateProps) {
  const proxyStatus = useProxyStatus()
  const openSettingsDialog = useStudioUIStore(
    (state) => state.openSettingsDialog
  )
  const { isProxyHealthy } = useProxyHealthCheck(proxyStatus)
  const handleProxyStart = () => {
    return window.studio.proxy.launchProxy()
  }

  if (!isScriptSelected) {
    return (
      <>
        <Text color="gray" size="1">
          Validate a k6 script created outside of Grafana k6 Studio
        </Text>
        <Button onClick={onSelectScript}>Open external script</Button>
      </>
    )
  }

  if (proxyStatus !== 'online') {
    return (
      <>
        <Text size="1" color="gray" align="center">
          Proxy is offline
          <br />
          Start proxy or check proxy configuration in{' '}
          <TextButton onClick={() => openSettingsDialog('proxy')}>
            Settings
          </TextButton>
          .
        </Text>
        <Button onClick={handleProxyStart} loading={proxyStatus === 'starting'}>
          Start proxy
        </Button>
      </>
    )
  }

  return (
    <>
      <Text color="gray" size="1">
        Validate the script to inspect requests, logs, and checks
      </Text>
      <Button disabled={isRunning} onClick={onRunScript}>
        <Spinner loading={isRunning}>
          <CircleCheckIcon />
        </Spinner>
        Validate script
      </Button>

      {!isProxyHealthy && (
        <Box width="720px">
          <ProxyHealthWarning />
        </Box>
      )}
    </>
  )
}
